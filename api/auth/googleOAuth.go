package auth

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lestrrat-go/jwx/jwk"
	"google.golang.org/api/idtoken"
)

var keySet jwk.Set

func init() {
	keys, err := jwk.Fetch(context.Background(), "https://www.googleapis.com/oauth2/v3/certs")

	if err != nil {
		panic(err)
	}

	keySet = keys
}

func GetKey(token *jwt.Token) (interface{}, error) {
	validatedToken, err := idtoken.Validate(context.Background(), token.Raw, os.Getenv("GOOGLE_CLIENT_ID"))
	if err != nil {
		return nil, fmt.Errorf("invalid token: %s", err.Error())
	}

	organization := "htlwienwest.at"
	if hd, ok := validatedToken.Claims["hd"].(string); !ok || hd != organization {
		return nil, fmt.Errorf("invalid organization: expected %s, got %s", organization, hd)
	}

	keyId, ok := token.Header["kid"].(string)
	if !ok {
		return nil, errors.New("expecting JWT header to have string kid")
	}

	key, found := keySet.LookupKeyID(keyId)
	if !found {
		return nil, fmt.Errorf("unable to find key %q", keyId)
	}

	var rawPubkey interface{}
	if err := key.Raw(&rawPubkey); err != nil {
		return nil, fmt.Errorf("failed to create public key: %s", err.Error())
	}

	return rawPubkey, nil
}
