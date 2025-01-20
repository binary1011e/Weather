import React from 'react'
import sunUrl from '/public/summer-sun-block-svgrepo-com.svg'
import moonUrl from '/public/moon-svgrepo-com (3).svg'

export default function UV({uv}) {
    if (uv >= 3) {
        return <img width="50px" height="50px" src={sunUrl}/>;
    }
    return <img width="50px" height="50px" src={moonUrl}/>;
}