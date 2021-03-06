[![npm version](https://badge.fury.io/js/http2lite.svg)](https://badge.fury.io/js/http2lite)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/dtudury/Http2Lite.svg?branch=master)](https://travis-ci.com/dtudury/Http2Lite)
[![Coverage Status](https://coveralls.io/repos/github/dtudury/Http2Lite/badge.svg?branch=master)](https://coveralls.io/github/dtudury/Http2Lite?branch=master)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.png?v=103)](https://opensource.org/licenses/GPL-3.0/)
<br/>
[![Known Vulnerabilities](https://snyk.io/test/github/dtudury/Http2Lite/badge.svg)](https://snyk.io/test/github/dtudury/Http2Lite)
[![Dependency Status](https://david-dm.org/dtudury/Http2Lite.svg)](https://david-dm.org/dtudury/Http2Lite)
[![devDependencies Status](https://david-dm.org/dtudury/Http2Lite/dev-status.svg)](https://david-dm.org/dtudury/Http2Lite?type=dev)
<br/>
[![Maintainability](https://api.codeclimate.com/v1/badges/c325ed082797477c14fc/maintainability)](https://codeclimate.com/github/dtudury/Http2Lite/maintainability)
[![Inline docs](http://inch-ci.org/github/dtudury/http2lite.svg?branch=master)](http://inch-ci.org/github/dtudury/http2lite)

# Http2Lite

zero dependency tools for DIY http2 in node or browser (with a build tool that understands require)

### TODO

-   more documentation
-   fix "code smells"
-   put something meaningful into the readme
-   build a simple default hpack context
-   add an example (or two)
-   fix generated API documentation

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [H2LSession](#h2lsession)
    -   [Parameters](#parameters)
    -   [writeFrame](#writeframe)
        -   [Parameters](#parameters-1)
    -   [request](#request)
-   [H2LStream](#h2lstream)
    -   [Parameters](#parameters-2)
    -   [writeRequest](#writerequest)
        -   [Parameters](#parameters-3)
-   [Request](#request-1)
    -   [Properties](#properties)
-   [decodeRequest](#decoderequest)
    -   [Parameters](#parameters-4)
-   [encodeRequest](#encoderequest)
    -   [Parameters](#parameters-5)
-   [decodeFrameHeader](#decodeframeheader)
    -   [Parameters](#parameters-6)
-   [FrameHeader](#frameheader)
    -   [Properties](#properties-1)
-   [encodeFrameHeader](#encodeframeheader)
    -   [Parameters](#parameters-7)
-   [decodeFlags](#decodeflags)
    -   [Parameters](#parameters-8)
-   [Flags](#flags)
    -   [Properties](#properties-2)
-   [decodePriority](#decodepriority)
    -   [Parameters](#parameters-9)
-   [Priority](#priority)
    -   [Properties](#properties-3)
-   [encodePriority](#encodepriority)
    -   [Parameters](#parameters-10)
-   [alloc](#alloc)
    -   [Parameters](#parameters-11)
-   [allocUnsafe](#allocunsafe)
    -   [Parameters](#parameters-12)
-   [readUInt8](#readuint8)
    -   [Parameters](#parameters-13)
-   [readUInt24BE](#readuint24be)
    -   [Parameters](#parameters-14)
-   [readUInt32BE](#readuint32be)
    -   [Parameters](#parameters-15)
-   [writeUInt8](#writeuint8)
    -   [Parameters](#parameters-16)
-   [writeUInt24BE](#writeuint24be)
    -   [Parameters](#parameters-17)
-   [writeUInt32BE](#writeuint32be)
    -   [Parameters](#parameters-18)
-   [concat](#concat)
    -   [Parameters](#parameters-19)

### H2LSession

**Extends Emitter**

Muxes and demuxes

#### Parameters

-   `nextStreamId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** default is 1 for client, passing 2 would be for server (optional, default `1`)

#### writeFrame

Emit any new http messages. Emit new streams when necessary.

##### Parameters

-   `frame` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** partial and/or multiple encoded http messages

#### request

Returns **[H2LStream](#h2lstream)** 

### H2LStream

**Extends Emitter**

Gateway for reading from and writing to virtual streams

#### Parameters

-   `h2LSession` **[H2LSession](#h2lsession)** 
-   `streamId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

#### writeRequest

Encode http-like request and mux it into the output stream

##### Parameters

-   `request`  

### Request

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `type` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `streamId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `padLength` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `payload` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `bytesRead` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### decodeRequest

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

Returns **[Request](#request)** 

### encodeRequest

#### Parameters

-   `request` **[Request](#request)** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

### decodeFrameHeader

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

Returns **[FrameHeader](#frameheader)** 

### FrameHeader

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `streamId` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `type` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `length` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### encodeFrameHeader

#### Parameters

-   `frameHeader` **[FrameHeader](#frameheader)** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

### decodeFlags

#### Parameters

-   `ui8` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Flags](#flags)** 

### Flags

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `endStream` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `isAck` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `endHeaders` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `isPadded` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `isPriority` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### decodePriority

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

Returns **[Priority](#priority)** 

### Priority

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `priority` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `streamDependency` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `isExclusive` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### encodePriority

#### Parameters

-   `priority` **[Priority](#priority)** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

### alloc

#### Parameters

-   `size` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

### allocUnsafe

#### Parameters

-   `size` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 

### readUInt8

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### readUInt24BE

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### readUInt32BE

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### writeUInt8

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `value` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### writeUInt24BE

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `value` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### writeUInt32BE

#### Parameters

-   `ui8a` **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
-   `value` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `offset` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### concat

#### Parameters

-   `ui8as` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)>** 

Returns **[Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)** 
