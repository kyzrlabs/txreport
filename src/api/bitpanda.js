
export class BitpandaTXApi {


    constructor(apiKey) {
        this._baseUrl = import.meta.env.VITE_API_HOST
        this._apiKey = apiKey;
        this._type = "";
        this._status = "";
        this._coin_symbol = "";
        this._is_savings = "";
        this._date_range = "";
        this._pageSize = "&page_size=1000"
    }

    static transaction(apiKey) {
        return new BitpandaTXApi(apiKey);
    }

    withType(type) {
        if (!type || type.toLowerCase() === "all") return this
        this._type = `&type=${type}`;
        return this;
    }

    withStatus(status) {
        if (!status) return this
        this._status = `&type=${status}`;
        return this;
    }

    withCoinSymbol(coinSymbol) {
        if (!coinSymbol || coinSymbol.toLowerCase() === "all") return this
        this._coin_symbol = `&coin_symbol=${coinSymbol}`;
        return this;
    }

    withIsSavings(isSavings) {
        if (!isSavings) return this
        this._is_savings = `&is_savings=${isSavings}`;
        return this;
    }

    withDateRange(from, to) {
        from = from ? dateOrToday(from) : new Date("1970-01-01")
        to = to ? dateOrToday(to) : new Date()
        console.debug("applying date filter for %s - %s", from, to)
        this._date_range=`&from=${from.unixMillis()}&to=${to.unixMillis()}`
        return this;
    }


    async fetch() {
        const url = `${this._baseUrl}/transactions?ts=1${this._type}${this._status}${this._coin_symbol}${this._is_savings}${this._date_range}`;
        const response = await fetch(url, {
            headers: {
                'X-API-KEY': this._apiKey
            }
        });
        return response.json();
    }

}


function dateOrToday(dateStr) {
    if (!dateStr) {
        return new Date()
    } else return new Date(dateStr)
}

function unixMillis(date) {
    return
}

Date.prototype.unixMillis = function() {
    return Math.floor(this.getTime() / 1000);
};