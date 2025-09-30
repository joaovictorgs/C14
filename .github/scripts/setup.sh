#!/usr/bin/env bash
set -euo pipefail

# Instalações de sistema que seu projeto precisa no runner
sudo apt-get update -y

# Exemplo: utilitários úteis para builds/tests (adicione o que precisar)
sudo apt-get install -y jq
