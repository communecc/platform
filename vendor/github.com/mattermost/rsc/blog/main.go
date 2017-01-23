// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"github.com/commune/rsc/devweb/slave"

	_ "github.com/commune/rsc/blog/post"
)

func main() {
	slave.Main()
}
