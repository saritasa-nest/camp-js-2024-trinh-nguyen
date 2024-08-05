import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment.prod';

/** Works with environment variables. */
@Injectable({ providedIn: 'root' })
export class AppConfig {
	private readonly variables = environment;

	/** Get baseApiUrl environment variable. */
	public get apiUrl(): string {
		return this.variables.baseUrl;
	}
}
