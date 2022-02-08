#!/bin/sh

curl -X GET "https://api.covalenthq.com/v1/9000/events/address/0x6031278d1104B70922A9ef05acb1801D1F4dD6E1/?ending-block=latest&starting-block=0" \
   -u ckey_b06f99bd63154103aa052a0be31: \
   -H 'Content-Type: application/json'
