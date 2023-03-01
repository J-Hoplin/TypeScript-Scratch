/**
 * builder pattern
 * 
 */


type httpMethods = 'get' | 'post' | 'put' | 'delete';

class RequestBuilder {
    private url: string | null = null;
    private data: object | null = null;
    private method: httpMethods | null = null

    setURL(url: string): this {
        this.url = url;
        return this
    }

    setMethod(method: httpMethods): this {
        this.method = method;
        return this
    }

    setData(data: object): this {
        this.data = data;
        return this
    }
    send() { }
}

/**
 * 하지만 이러한 방식은 완벽하지 않다
 * 
 * 예를들어 send()를 하기전에 metod, httpcode 등이 설정되게 되면 위험하다.
 */
new RequestBuilder()
    .setURL('/users')
    .setMethod('get')
    .setData({
        firstname: 'hoplin'
    })
    .send()

/**
 * 그렇다면 send()를 하기전에 method, httpcode가 모두 설정되어있게끔
 * 컴파일러에 보장을 해주려면 어떻게 해야할까?
 */

class RequestBuilder2 {
    protected url: string | null = null;
    protected data: object | null = null;
    protected method: httpMethods | null = null
    setMethod(method: httpMethods): RequestBuilder2WithMehtod {
        return new RequestBuilder2WithMehtod().setMethod(method).setData(this.data);
    }

    setData(data: object | null): this {
        this.data = data;
        return this
    }
}

class RequestBuilder2WithMehtod extends RequestBuilder2 {
    setMethod(method: httpMethods | null): this {
        this.method = method;
        return this
    }
    setURL(url: string): RequestBuilder2WithMehtodURL {
        return new RequestBuilder2WithMehtodURL()
            .setMethod(this.method)
            .setURL(url)
            .setData(this.data)
    }
}

class RequestBuilder2WithMehtodURL extends RequestBuilder2WithMehtod {
    setURL(url: string): this {
        this.url = url;
        return this;
    }

    send() { }
}
