import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

/** Create fetch Genre. */
export const fetchGenres = createAsyncThunk(
	'genres/fetch',
	() => GenresService.fetchGenres(),
);
