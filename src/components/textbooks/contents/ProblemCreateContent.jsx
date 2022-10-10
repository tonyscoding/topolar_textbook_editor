import React, {useEffect, useState} from "react";

import {Input} from "@nextui-org/react";


const ProblemCreateContent = () => {


    return (
        <>

                    <div className={"problem-container"}>
                        <Input clearable bordered labelPlaceholder="Name" initialValue="NextUI" />

                    </div>



        </>
    );
}

export default ProblemCreateContent;