# IP Info Application End Points:

## User:

### POST /user/signup -> {name, email, password} in body
### POST /user/login -> {email,password} in body
### GET /user/logout -> (token in authorisation) in headers

## IP Address:

### POST /ip/location -> { ip: XXX.XXX.XXX.XXX } in body
###                   -> (token in authorisation) in headers