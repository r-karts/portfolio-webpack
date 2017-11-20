package hello

import (
    "net/http"
)

func init() {
    http.Handle("/", http.FileServer(http.Dir("./dist")))
}
