Below is a **self-contained, comprehensive product brief** that integrates **everything** we've discussed so far. This document will give an **Engineering Manager LLM** the full context needed to craft a detailed technical spec. It covers our **Hackathon context,** the **original MVP chatbot,** the **new expanded "AI Services Marketplace,"** and the **demo flow** (including screenshots). We assume you'll provide this product brief **along with**:

-   Your **v0-generated UI code** for the new Marketplace
-   The **original chatbot code** for reference

The Engineering Manager LLM can then produce an end-to-end technical roadmap.

* * * * *

1\. HACKATHON CONTEXT
---------------------

-   **Hackathon**: [Electroneum Hackathon 2025](https://electroneum-hackathon-2025.devpost.com/)
-   **Deadline**: March 7, 2025
-   **Requirements**:
    -   Must build a working dApp on Electroneum (fast, low fees, EVM-compatible).
    -   Provide a mainnet-deployed smart contract, GitHub code, a short demo video, etc.

**Goal**: Create a compelling, real-world demonstration of **AI + blockchain micropayments** using Electroneum (ETN). We aim to highlight:

-   **Instant settlement** (~5 second finality)
-   **Very low fees** → feasible micropayments for AI usage
-   **EVM compatibility** → we can write Solidity contracts easily

We **already** built a smaller MVP---a **"micropayment chatbot"**---but we're **expanding** to a **full AI Services Marketplace** for the final hackathon submission.

* * * * *

2\. WHAT WE ALREADY BUILT (MVP CHATBOT)
---------------------------------------

### 2.1 Summary of Chatbot MVP

-   **Concept**: Users pay tiny ETN amounts per query to access a GPT-like chatbot.

-   **How it works**:

    1.  Frontend: Prompt input, shows required ETN price.
    2.  User signs a payment transaction.
    3.  On confirmation (~5s), the backend calls OpenAI's API.
    4.  The AI response is displayed.
-   **Status**: We have working code (React + Node + Solidity) demonstrating micropayment verification and real-time AI calls.

-   **Lessons Learned**:

    -   Micropayment flows on Electroneum are indeed feasible.
    -   We can easily integrate AI APIs (OpenAI, etc.) with the chain logic.
    -   A single chatbot interface is somewhat limited; we want a broader approach.

Hence, we decided to **scale** the concept into a **Marketplace** with multiple AI services (image tasks, text tasks, code tasks, etc.).

* * * * *

3\. OVERALL PRODUCT CONCEPT: "AI SERVICES MARKETPLACE"
------------------------------------------------------

### 3.1 High-Level Overview

We're building a **one-stop shop** where users can:

1.  **Browse** multiple AI "agents" or services (e.g. text summarizer, image upscaler).
2.  **Pay** in ETN to execute a task.
3.  The service runs an AI model (e.g., stable diffusion, GPT, code analyzers).
4.  The result is returned to the user (a processed image, a summary, a translation, etc.).

Key points:

-   **Micropayments** in ETN: Since transaction fees are minimal, we can do pay-per-use.
-   **Dynamic pricing**: The cost might increase with large input files or advanced tasks.
-   **Security**: Payment is trustless, recorded on the chain.
-   **Ease of use**: "Connect Wallet" or "Pay with ETN" approach, with ~5s confirmation.

### 3.2 New UI Screens (Reference)

We've attached screenshots of our new **Marketplace** interface and **Service** pages (some for "image tasks," others for "text tasks"). Each is "light mode," minimal but polished---similar to the style of AnyTask or the reference screenshot from PinLink. They show:

1.  **Marketplace**: Grid of 8--10 AI services, each with an image, a short description, and a "starting price" like "0.2+ ETN."
2.  **Service Detail**:
    -   A more prominent image or banner
    -   Input fields for text prompts
    -   File upload for images or data
    -   "Estimated cost" note or "Starting at X ETN"
    -   A "Pay with ETN" or "Proceed" button

We also have a top bar with a placeholder logo ("ETN AI Marketplace") and a "Connect Wallet" button on the right.

* * * * *

4\. PRODUCT DETAILS & SCOPE
---------------------------

### 4.1 Key Features

1.  **Marketplace Homepage**

    -   List of AI services in card format (each with name, short blurb, price starting point).
    -   A minimal top bar: square logo, brand name, "Connect Wallet" button.
    -   A simple search bar & filter button.
    -   Short tagline or description beneath search (e.g. "AnyTask for AI agents").
2.  **Service Detail Page**

    -   Larger banner image.
    -   Title & detailed description.
    -   **User Input**: Text area for prompts (like "summarize this text").
    -   **File Upload**: An upload field for images or documents. Possibly disabled if not needed by that service.
    -   Note: "Pricing may adjust based on input length or file size."
    -   "Pay with ETN" or "Proceed" button (no real logic for now, just a placeholder hook).
3.  **Micropayment Flow** (similar logic to the old chatbot MVP)

    -   Once user hits "Pay" or "Proceed," we do on-chain micropayment to our contract.
    -   After confirmation, the system runs the appropriate AI pipeline.
    -   The result is displayed or downloadable.
4.  **Wallet Connection**

    -   A placeholder "Connect Wallet" button in the top bar.
    -   If connected, show short wallet address + "Disconnect."
5.  **Responsive Layout**

    -   Works well on mobile & desktop.
    -   Clean, white background, blue accent color (#00ADE8).

### 4.2 Implementation Layers

1.  **Frontend**: Next.js 13+ with App Router.

    -   React + Tailwind + shadcn/ui for the UI.
    -   The new "Marketplace" and "Service Detail" pages.
    -   Payment interactions & connect wallet are placeholders (some examples from the chatbot MVP code).
2.  **Smart Contract**:

    -   Minimal Solidity contract that handles micropayment logic or an event-based approach.
    -   Possibly similar to our chatbot MVP code.
3.  **Backend / AI**:

    -   Node or serverless approach that calls AI APIs (OpenAI, Stability, etc.).
    -   Subscribes or polls for transaction confirmations.
    -   Once confirmed, executes the AI task.
4.  **Integration with ETN**:

    -   On mainnet (or testnet if the hackathon allows, but likely mainnet).
    -   Using **ANKR** (sponsor) for stable RPC if needed.

* * * * *

5\. DEMO FLOW (2--5 MINUTE VIDEO)
--------------------------------

We'll produce a short video featuring:

1.  **Scene 1: Intro**

    -   Show the top bar with our logo "ETN AI Marketplace" and mention "AnyTask for AI agents."
2.  **Scene 2: Browsing the Marketplace**

    -   Showcase the **8+ service cards**: some text-based (summarizer, translator) and some image-based (upscaler, background remover).
    -   Note the "0.2+ ETN" starting price tags.
    -   Possibly do a quick search in the search bar.
3.  **Scene 3: Selecting a Service**

    -   Click a card ("Image Upscaler," for example).
    -   Land on the detail page with a bigger banner, a short paragraph, an input area, and a file upload field.
    -   Emphasize dynamic pricing: "Starting at 0.2 ETN, may increase for large files."
4.  **Scene 4: Payment & AI Execution**

    -   Click "Proceed" → triggers a payment flow. (We'll show a MetaMask or custom ETN wallet popup, the user approves transaction.)
    -   After ~5 seconds, the on-chain event confirms.
    -   The AI service processes the file or text and returns the result (for the demo, we can show a sample result or an image thumbnail).
5.  **Scene 5: Conclusion**

    -   Return to the marketplace or show an "Order completed" message.
    -   Quick look at the Electroneum block explorer or mention "This is real on-chain payment."
    -   Possibly highlight we used ANKR's premium RPC for speed.
    -   Summarize: "That's our AI Services Marketplace---micropayments on ETN make real-time AI tasks possible."

* * * * *

6\. WHERE THE ENGINEERING MANAGER LLM FITS
------------------------------------------

We will provide:

1.  **This Product Brief** (the document you're reading now).
2.  **All v0 "Marketplace UI" code** (a Next.js project built with shadcn/ui).
    -   Contains the homepage with 8 services, the service detail pages, top bar, connect wallet placeholders.
3.  **Original Chatbot MVP code** for reference on micropayment logic.

**Your Task**: Generate a **full technical specification** describing exactly how to:

-   Integrate **smart contracts** for payment verification.
-   Manage "Connect Wallet" logic or placeholders.
-   Link the **AI backend** code to the front-end triggers.
-   Potentially reuse or adapt the chatbot micropayment flow.
-   Outline deployment steps on Electroneum mainnet (or testnet).
-   Provide any recommended improvements for security, data flow, or performance.

We want an end-to-end plan ensuring we can:

1.  Deploy the UI
2.  Deploy the contract
3.  Connect them with a simple Node/Express or serverless function for AI tasks
4.  Show everything is on mainnet for the hackathon submission

* * * * *

7\. ADDITIONAL NOTES & FUTURE ROADMAP
-------------------------------------

-   We're open to **new AI services** or expansions (like multi-file uploads or advanced data filtering).
-   We may consider **staking** or **revenue splitting** for service providers in the future.
-   The hackathon scope is a minimal, functional marketplace that demonstrates the viability of **ETN micropayments** for AI tasks.
-   If time allows, we might incorporate **NFT** receipts or "session tokens," but that's not mandatory for MVP.

* * * * *

### END OF PRODUCT BRIEF

With this document, plus the UI code and chatbot reference, the **Engineering Manager LLM** should have **all** the context to create a thorough technical spec. This includes recommended architecture, relevant endpoints, suggested contract methods, and anything else needed to finalize the solution for the **Electroneum Hackathon 2025** submission.