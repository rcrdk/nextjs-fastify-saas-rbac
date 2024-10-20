interface VerifyAccountEmailTemplateParams {
	name: string | null
	code: string
	link: string
}

export function verifyAccountEmailTemplate({
	name,
	code,
	link,
}: VerifyAccountEmailTemplateParams) {
	return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${name ? name.split(' ').at(0) + '!' : ''}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			We received a request to verify your e-mail address on our platform. To proceed, please use the unique validation code below:
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Validation Code:</strong>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${code}
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<i>Note: The code is valid for 5 minutes.</i>
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<strong>Here’s what to do next:</strong>
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			1. Copy the validation code provided above.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			2. Click the link to proceed with validation:
			<a href="${link}" style="text-decoration:underline;color:currentColor;">Complete E-mail Verification</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			3. Paste the code when prompted on the verification page.
		</p>

		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you did not request this, you can safely ignore this email.
		</p>

		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Thanks.
		</p>
	`
}
