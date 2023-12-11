---
title: "Internship | Developping a library for Tangible Spherical Display"
date: 2016-06-01
enddate: 2016-07-31
categories: internship activity
place: "Inria Bordeaux"
link: "https://manao.inria.fr/"
---
For two months, I worked with the <a href="https://manao.inria.fr/" target="_blank">MANAO team</a> and the <a href="https://team.inria.fr/potioc/fr/" target="_blank">POTIOC team</a> in the <a href="https://www.inria.fr/en" target="_blank">INRIA Bordeaux laboratory</a>, under the direction of <a href="https://dblp.org/pid/r/PatrickReuter.html" target="_blank">Patrick Reuter</a> and <a href="https://ankebrock.com" target="_blank">Anke Brock</a>. I was in charge of designing a JS library for web developers to help them program applications on a spherical touch screen as they would with a traditional 2D web page. 

This work consisted of 
- 1) translating tactile inputs detected on the spherical screen via <a href="https://www.tuio.org/" target="_blank">TUIO</a> into classic <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank"> JS-like events</a>, including <a href="https://en.wikipedia.org/wiki/Parametric_equation" target="_blank"> parametric transformations</a> from <a href="https://en.wikipedia.org/wiki/Lambert_azimuthal_equal-area_projection" target="_blank">azimuthal</a> to <a href="https://en.wikipedia.org/wiki/Map_projection#Cylindrical" target="_blank">cylindrical</a> projections coordinates, and 
- 2) applying the inverse visual transformation to <a href="https://en.wikipedia.org/wiki/Document_Object_Model" target="_blank">DOM elements</a> created in 2D, on the spherical screen.

My contribution was part of <a href="https://inria.hal.science/hal-01523744/" target="_blank">"Code The Globe", published at the PerDIS conference in 2017</a>.