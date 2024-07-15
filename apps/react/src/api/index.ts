import axios from 'axios';

import { CONFIG } from './config';

/** Create base URL. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
