import React from "react";
import Button from "../../components/Shared/Button/Button";

const Login = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<fieldset className="fieldset shadow-xl bg-base-200 border-base-300 rounded-xl w-xs border p-4">
				<legend className="fieldset-legend">
          <h4>Login</h4>
        </legend>

				<label className="label text-primary">Email</label>
				<input type="email" className="input rounded-xl" placeholder="Email" />

				<label className="label text-primary">Password</label>
				<input type="password" className="input" placeholder="Password" />

        <Button label={'Login'} />
			</fieldset>
		</div>
	);
};

export default Login;
