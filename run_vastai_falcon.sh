#!/usr/bin/env bash
# ==============================================================================
# ORPHEUS VAST.AI / RUNPOD PROVISIONING SCRIPT
# Model: Falcon-11B (tiiuae/falcon-11B) with 4-bit NF4 Quantization (bitsandbytes)
# VRAM footprint: ~5.8 GB (Fits on RTX 3060, RTX 3090, RTX 4090, A10G)
# Estimated Cost: US$ 0.32 / hour (Less than $2.00 / day)
# ==============================================================================

set -e

echo "[+] Initializing environment on Vast.ai GPU instance..."
export DEBIAN_FRONTEND=noninteractive

# 1. Update and install high-performance Python dependencies
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers accelerate bitsandbytes fastapi uvicorn pydantic

# 2. Python Serving Script with 4-bit NF4 Quantization
cat << 'EOF' > serve_falcon.py
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Orpheus Falcon-11B 4-bit Inference Gateway")

MODEL_ID = "tiiuae/falcon-11B"

print(f"[+] Loading {MODEL_ID} in 4-bit NF4 Quantization...")
quant_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True
)

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=quant_config,
    device_map="auto"
)
print("[+] Model loaded successfully into VRAM (~5.8 GB).")

class FrictionRequest(BaseModel):
    raw_text: str

@app.post("/classify")
def classify_friction(req: FrictionRequest):
    prompt = f"""<human>: Analise o texto abaixo e extraia a dor financeira.
Texto: {req.raw_text}
Retorne no formato JSON com: setor, dor_principal, custo_estimado_por_ocorrencia, urgencia_score.
<falcon>: """

    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    with torch.no_grad():
        outputs = model.generate(**inputs, max_new_tokens=256, temperature=0.2)
    response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"raw_output": response_text}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

echo "[+] Starting FastAPI server on port 8000..."
python serve_falcon.py
