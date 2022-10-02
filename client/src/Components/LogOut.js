import { GoogleLogout } from 'react-google-login';
const clientId = "1038695984787-1p4udh37usv0poigeh96bh31l3t0uasr.apps.googleusercontent.com";
export default function Logout() {

    const onSuccess = () => {
        alert('Logout made successfully');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

