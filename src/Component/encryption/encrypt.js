/* Copyright (C) Indus Software Technologies Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import React from "react";
import $ from 'jquery';
import GlobalHelper from '../../utils/GlobalHelper';
export const encrypt = (message) =>
{
    let url = GlobalHelper.globlevar['contextpath'] + 'public.pem';
    console.log("public.pem " , url)
	var publicKey = $.ajax({
            type: "GET",
            url: url,
            data:{},
            async: false
        }).responseText;
    let currentMilliseconds = new Date().getTime().toString();
    let randomNo = Math.random().toString();
    let token = currentMilliseconds.slice(0, 4) + randomNo.substr(randomNo.length - 4) + currentMilliseconds.slice(4);
    message = token.slice(0, 10) + message + token.slice(10);
    var NodeRSA = require('node-rsa')
    var key = new NodeRSA({b: 1024})
    key.importKey(publicKey, 'pkcs8-public');
    key.setOptions({encryptionScheme: 'pkcs1'})
    return key.encrypt(message, 'base64')
}
