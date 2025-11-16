# 🎯 CalibraPlus: precisão na calibração de pulverizadores (TCC)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Feito com Expo](https://img.shields.io/badge/Made%20with-Expo-000.svg?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)

## 📌 Sobre o projeto

O **CalibraPlus** é um aplicativo desenvolvido como Trabalho de Conclusão de Curso que se propõe a ser um aplicativo móvel robusto, focado em auxiliar produtores rurais e técnicos agrícolas a alcançar a máxima precisão na **calibração de pulverizadores agrícolas**.

A agricultura moderna exige exatidão. No entanto, o processo de calibração ainda é frequentemente realizado de forma **empírica**, resultando em:

* **Desperdício de insumos:** aplicação incorreta de defensivos.
* **Perdas econômicas:** tratamentos ineficazes e prejuízos significativos na safra.
* **Impactos ambientais:** uso desnecessário ou excessivo de produtos químicos.

O **CalibraPlus** surge como a solução tecnológica para minimizar esses erros. Ele fornece **cálculos automáticos** e **orientações técnicas**, permitindo que o usuário garanta a precisão da aplicação, promovendo maior eficiência operacional e sustentabilidade no campo.

## ✨ Funcionalidades em destaque

* **Calibração precisa:** módulos de cálculo para vazão e volume de calda em tempo real.
* **Orientação técnica:** guias passo a passo para calibração de diferentes tipos de pulverizadores.
* **Modo offline:** acessibilidade total em áreas rurais com conectividade limitada.
* **Design intuitivo:** interface limpa e prática, focada na experiência do usuário no ambiente de trabalho.

***

## 🛠️ Tecnologias utilizadas (Tech Stack)

Este projeto foi arquitetado em um ambiente de **Monorepo** para garantir máxima velocidade no desenvolvimento, reuso de código e escalabilidade em múltiplas plataformas, aproveitando as seguintes tecnologias:

| Categoria | Tecnologia | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Desenvolvimento Móvel** | **Expo** & **React Native** | - | Criação de um aplicativo nativo para Android e iOS a partir de uma única base de código. |
| **Linguagem** | **TypeScript** | - | Código mais robusto e com menos erros através da tipagem estática. |
| **Gerenciamento de pacotes** | **pnpm** | - | Gerencia as dependências do monorepo de forma eficiente, otimizando espaço e instalação. |
| **Ferramenta de build** | **Turborepo** | - | Acelera tarefas de *build*, testes e linting através de *cache* de resultados. |

O projeto utiliza o **Turborepo** para caching avançado do **Metro Bundler**, garantindo que as construções (builds) e publicações (EAS Hosting) sejam rápidas.

***

## 🚀 Como rodar o aplicativo (Instalação e execução)

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js**
* **pnpm** (Você pode instalá-lo globalmente com `npm install -g pnpm`)
* **Expo Go** (Aplicativo móvel para testes, disponível nas lojas de apps).

### Passos para a execução

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/GabrielPerico/agrocerto.git](https://github.com/GabrielPerico/agrocerto.git)
    cd agrocerto
    ```

2.  **Instale as dependências:**
    O `pnpm` cuidará de instalar todas as dependências do monorepo de forma otimizada:
    ```bash
    pnpm install
    ```

3.  **Acesse a pasta do app:**
    ```bash
    cd ./apps/agrocerto
    ```

4. **Execute o aplicativo:**
    ```bash
    pnpm run start
    ```

5.  **Acesse o app:**
    Um **QR Code** será exibido no seu terminal. Abra o aplicativo **Expo Go** no seu celular e escaneie o código. O aplicativo será carregado automaticamente, permitindo o desenvolvimento e testes em tempo real.

***

## Autores

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/gabrielperico">
                <img src="https://avatars.githubusercontent.com/u/49540363?v=4" width="80px;" alt="Gabriel Périco"/>
                <br>
                <sub>
                    <b>Gabriel Périco</b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/joaopaludo">
                <img src="https://avatars.githubusercontent.com/u/72082760?v=4" width="80px;" alt="João Paulo Gregolon Paludo"/>
                <br>
                <sub>
                    <b>João Paulo Gregolon Paludo</b>
                </sub>
            </a>
        </td>
    </tr>
</table>

***

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para obter todos os detalhes da licença.
