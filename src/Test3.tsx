import React, {Fragment} from "react";
import {TextInput, Text} from "react-native";

export default ({label = "Hello3"}: {label?: string}) => (
    <Fragment>
        <Text>{label}</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
    </Fragment>
)
