# Level 4 Verification & Submission Notes

This document provides submission verification details for **TinyTip** for the **Stellar Journey to Mastery (Monthly Builder Challenges)** program.

---

## Submission Requirements & Verification Evidence

### 1. Mobile Responsive UI
- The Next.js frontend has been designed with responsive CSS utility tokens (`sm:`, `md:`, `flex-col`, hamburger mobile menu).
- To test mobile responsiveness locally:
  1. Run `npm run dev`
  2. Open `http://localhost:3000`
  3. Toggle Device Toolbar in Chrome DevTools (`Cmd + Shift + M`) and inspect on iPhone / Pixel screen widths.

### 2. CI/CD Pipeline Running
- GitHub Actions workflow status: **PASSING** (`✓`)
- Workflow file: `.github/workflows/smart-contract.yml`
- Workflow URL: [github.com/sayyidusy15/tinytip-stellar/actions](https://github.com/sayyidusy15/tinytip-stellar/actions)
- Automated steps:
  - Rust formatting check (`cargo fmt --check`)
  - Soroban WASM build verification (`stellar contract build`)
  - Unit test suite execution (`cargo test --workspace`)

### 3. Test Output (5 Passing Tests)
- Executing `cd contracts/notes && cargo test` produces 5 passing tests:
  - `test_register_and_get_creator`: Verifies on-chain creator registration and getter
  - `test_send_tip`: Verifies tipping logic, balance updates, and tip records
  - `test_multiple_creators_registration`: Verifies multi-creator registry lookup
  - `test_multiple_tips_accumulation`: Verifies cumulative tips and unique donor tracking
  - `test_event_emission_on_tip`: Verifies Soroban contract event emission on tip receipt

---

## Contract Metadata
- **Contract Address**: `CA54QDAYDLAUENAJYIELIYFFTPC7OAXOVNL5B4DEME3NWOTTTWZ2PSDH`
- **Network**: Stellar Soroban Testnet
- **SDK Version**: Soroban SDK v25
