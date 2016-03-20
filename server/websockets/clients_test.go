package websockets

import (
	. "gopkg.in/check.v1"
)

type Map struct{}

var _ = Suite(&Map{})

func (*Map) TestAddHasRemove(c *C) {
	m := newClientMap()
	sv := newWSServer(c)
	defer sv.Close()

	// Add client
	cl, _ := sv.NewClient()
	m.Add(cl)
	c.Assert(m.Has(cl.id), Equals, true)

	// Remove client
	m.Remove(cl.id)
	c.Assert(m.Has(cl.id), Equals, false)
}

func newClientMap() *ClientMap {
	return &ClientMap{
		clients: make(map[string]*client),
	}
}

func (*Map) TestCountByIP(c *C) {
	m := newClientMap()
	sv := newWSServer(c)
	defer sv.Close()

	cls := [3]*client{}
	for i := range cls {
		cl, _ := sv.NewClient()
		cls[i] = cl
		m.Add(cl)
	}
	cls[0].ident.IP = "foo"
	cls[1].ident.IP = "foo"
	cls[2].ident.IP = "bar"

	c.Assert(m.CountByIP(), Equals, 2)
}
