export default class Debounce
{
    private fn: (...args: any[]) => void;
    private delay: number;
    private timer: NodeJS.Timeout | null;

    constructor(fn: (...args: any[]) => void, delay: number) {
        this.fn = fn;
        this.delay = delay;
        this.timer = null;
    }

    execute(...args: any[])
    {
        if(this.timer)
            clearTimeout(this.timer)
        this.timer = setTimeout(()=>this.fn(...args),this.delay)
    }
}