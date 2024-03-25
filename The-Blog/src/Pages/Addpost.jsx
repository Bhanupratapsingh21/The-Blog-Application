import React, { useEffect, useState } from "react";
import { Container } from "../Componets/index";
import {Postform} from '../Componets/index'
function Addpost() {
    return(
        <div className='py-8'>
        <Container>
            <Postform />
        </Container>
    </div>
    )
}

export default Addpost