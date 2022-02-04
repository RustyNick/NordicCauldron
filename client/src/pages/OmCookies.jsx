import React from 'react';

function OmCookies() {
    return (

        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', flexDirection: 'column', padding: '20px', }}>

            <div>
                <h1>
                    Om Cookies
                </h1>
                Enligt lagen om elektronisk kommunikation ska besökare på en webbplats informeras om användandet
                av cookies samt få möjligheten att förhindra att de används. På Nordiccauldrons hemsida använder
                vi oss av session cookies för att t.ex. hålla koll på din kundvagn och om du är inloggad eller inte.
                Session cookies lagras inte permanent på din dator, utan försvinner när du stänger din webbläsare.
                I de flesta webbläsare kan du stänga av användningen av cookies om du så önskar, detta medför dock att vår hemsida inte kommer fungera som den är tänkt.
            </div>
        </div>
    )
}

export default OmCookies;
