/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);
