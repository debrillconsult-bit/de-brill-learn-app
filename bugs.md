# Identified Bugs and Implementation Gaps

This document outlines technical issues, security risks, and missing features identified in the De-Brill Learn App.

---

## 🛑 Critical & Security Issues
1. **Hardcoded Supabase Credentials**:
    - **Location**: `src/lib/supabaseAuth.ts` (Lines 27-33, 132).
    - **Issue**: Sensitive API keys and connection strings are hardcoded in the source code rather than using environment variables exclusively.
2. **Hardcoded Supabase URL**:
    - **Location**: `src/lib/supabaseAuth.ts` (Lines 23, 129).
    - **Issue**: The project relies on hardcoded production URLs, which complicates environment switching (staging vs production).

---

## 🛠 Functional Gaps (Missing Implementation)
1. **Placeholder Routes**:
    - **Location**: `src/App.tsx`.
    - **Issue**: Several routes lead to a generic `Placeholder` component rather than functional screens:
        - `/teacher/analytics`
        - `/teacher/resources`
        - `/teacher/profile`
        - `/parent/tips`
        - `/parent/settings`
2. **Missing Game Logic**:
    - **Location**: `src/screens/FlowD/GamePlaceholder.tsx`.
    - **Issue**: Generic game IDs redirect to a placeholder, indicating that specific educational games are yet to be implemented.
3. **Partial Payment Flow**:
    - **Location**: `src/screens/FlowC/PaymentScreen.tsx` (Line 129).
    - **Issue**: Contains a `TODO` for real payment processing; currently likely uses mock logic.

---

## 🧩 Logic & Stability Issues
1. **Brittle Profile Sync**:
    - **Location**: `src/lib/supabaseAuth.ts` (Lines 198-224).
    - **Issue**: Uses a `while` loop with `setTimeout` retries to fetch a user profile after login. This suggests a race condition between Auth signup and Database profile creation that hasn't been properly solved at the architectural level.
2. **Arbitrary Loading Timeout**:
    - **Location**: `src/lib/AuthContext.tsx` (Lines 36-38).
    - **Issue**: Forces `isLoading` to `false` after 5 seconds regardless of whether the profile fetch succeeded. This can cause the app to flash unauthenticated states or break if the network is slow.
3. **Redundant Auth Timeouts**:
    - **Location**: `src/screens/FlowA/LoginScreen.tsx` (Lines 25-30) vs `src/lib/supabaseAuth.ts` (Line 134).
    - **Issue**: Overlapping timeout logic (20s in UI vs 12s in Lib) creates inconsistent error reporting.
4. **Speech Synthesis "Heartbeat" Hack**:
    - **Location**: `src/lib/speech.ts` (Lines 324-332).
    - **Issue**: Uses a `setInterval` to call `resume()` every 250ms on Capacitor. While a known workaround for mobile OS bugs, it is inefficient and can lead to unexpected behavior if not cleared correctly.

---

## 🎨 UI & UX Issues
1. **Inconsistent Navigation**:
    - **Location**: `src/App.tsx` (Lines 234-243).
    - **Issue**: `BottomNav` is only rendered on specific top-level routes. Sub-pages like `/book/:id` or `/lesson/*` lack consistent global navigation, forcing reliance on browser/system back buttons.
2. **Role Defaulting Risk**:
    - **Location**: `src/lib/supabaseAuth.ts` (Line 228).
    - **Issue**: Defaults missing roles to `'student'`. If a teacher's metadata fails to load, they may be locked into a student view.

---

## 📝 TODOs Found in Code
- `src/screens/FlowA/WelcomeCarousel.tsx`: "TODO: connect to global language context."
- `src/screens/FlowB/LessonWarmUp.tsx`: "Mouth Diagram / Animation Placeholder"
