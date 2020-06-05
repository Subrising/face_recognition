import React from 'react';

const Register = ({onRouteChange}) => {
    return(
        <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center bg-white o-50'>
            <div className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register New Account</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="username">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username" id="username" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"
                            onClick={() => onRouteChange('signin')}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" onClick={() => onRouteChange('signin')} className="f6 link dim black db">Back</a>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default Register;
