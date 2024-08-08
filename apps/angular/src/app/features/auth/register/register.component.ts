/* eslint-disable jsdoc/require-jsdoc */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
	public form: FormGroup | undefined;

	public loading = false;

	public submitted = false;

	public constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	public ngOnInit(): void {
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

}
