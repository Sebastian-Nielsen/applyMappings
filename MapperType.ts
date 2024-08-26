import {Err} from "./Err";


/**
 * If any type in the array of types `R` includes `Err` in it,
 * 	then return `T | Err`
 * 	else return `T`
 *
 * 	Example:
 * 	IncludeErr<number, [number, boolean, boolean]>  ->  number
 * 	IncludeErr<string, [number, boolean | Err, boolean]>  ->  string | Err
 */
export type IncludeErr<T, R extends unknown[]> = R extends [infer First, ...infer Rest]
	? [Err] extends First[] // If
		? T | Err
		: IncludeErr<T, Rest>
	: T;


////////////////////////////////////////////////////////////////////////////////////


type AB<A,B> = [
	(a: Exclude<A,Err>) => B,
]
type ABC<A,B,C> = [
	(a: Exclude<A,Err>) => B,
	(b: Exclude<B,Err>) => C,
]
type ABCD<A,B,C,D> = [
	(a: Exclude<A,Err>) => B,
	(b: Exclude<B,Err>) => C,
	(c: Exclude<C,Err>) => D,
]
type ABCDE<A,B,C,D,E> = [
	(a: Exclude<A,Err>) => B,
	(b: Exclude<B,Err>) => C,
	(c: Exclude<C,Err>) => D,
	(d: Exclude<D,Err>) => E,
]
type ABCDEF<A,B,C,D,E,F> = [
	(a: Exclude<A,Err>) => B,
	(b: Exclude<B,Err>) => C,
	(c: Exclude<C,Err>) => D,
	(d: Exclude<D,Err>) => E,
	(e: Exclude<E,Err>) => F,
]
type ABCDEFG<A,B,C,D,E,F,G> = [
	(a: Exclude<A,Err>) => B,
	(b: Exclude<B,Err>) => C,
	(c: Exclude<C,Err>) => D,
	(d: Exclude<D,Err>) => E,
	(e: Exclude<E,Err>) => F,
	(f: Exclude<F,Err>) => G,
]

export function applyMappings<A>(variable: A, mappings: _A<A>): void; // mappings is empty
export function applyMappings<A,B>(variable: A, mappings: AB<A,B>): IncludeErr<B, [B]>; // mappings.length==1
export function applyMappings<A,B,C>(variable: A, mappings: ABC<A,B,C>): IncludeErr<C,[B,C]>;
export function applyMappings<A,B,C,D>(variable: A, mappings: ABCD<A,B,C,D>): IncludeErr<D,[B,C,D]>; // mappings.length==3
export function applyMappings<A,B,C,D,E>(variable: A, mappings: ABCDE<A,B,C,D,E>): IncludeErr<E,[B,C,D,E]>;
export function applyMappings<A,B,C,D,E,F>(variable: A, mappings: ABCDEF<A,B,C,D,E,F>): IncludeErr<F,[B,C,D,E,F]>; // mappings.length==5
export function applyMappings<A,B,C,D,E,F,G>(variable: A, mappings: ABCDEFG<A,B,C,D,E,F,G>): IncludeErr<G,[B,C,D,E,F,G]>;
export function applyMappings(variable: any, mappings: any): any {
	if (variable instanceof Err) {
		return variable;
	}
	try {
		let result: any = variable;
		for (let i=0; i<mappings.length; i++) {
			result = mappings[i](result);
			if (result instanceof Err) {
				throw result;
			}
		}
		return result;
	} catch (e: any) {
		if (e instanceof Err) {
			return e;
		}
		return new Err();
	}
}


////////////////////////////////////////////////////////////////////////////////////


type _A<A> = []
type _AB<A,B> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
]
type _ABC<A,B,C> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
	(b: Exclude<B,Err>) => C | Promise<C>,
]
type _ABCD<A,B,C,D> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
	(b: Exclude<B,Err>) => C | Promise<C>,
	(c: Exclude<C,Err>) => D | Promise<D>,
]
type _ABCDE<A,B,C,D,E> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
	(b: Exclude<B,Err>) => C | Promise<C>,
	(c: Exclude<C,Err>) => D | Promise<D>,
	(d: Exclude<D,Err>) => E | Promise<E>,
]
type _ABCDEF<A,B,C,D,E,F> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
	(b: Exclude<B,Err>) => C | Promise<C>,
	(c: Exclude<C,Err>) => D | Promise<D>,
	(d: Exclude<D,Err>) => E | Promise<E>,
	(e: Exclude<E,Err>) => F | Promise<F>,
]
type _ABCDEFG<A,B,C,D,E,F,G> = [
	(a: Exclude<A,Err>) => B | Promise<B>,
	(b: Exclude<B,Err>) => C | Promise<C>,
	(c: Exclude<C,Err>) => D | Promise<D>,
	(d: Exclude<D,Err>) => E | Promise<E>,
	(e: Exclude<E,Err>) => F | Promise<F>,
	(f: Exclude<F,Err>) => G | Promise<G>,
]

export async function applyMappingsAsync<A>(variable: A, mappings: _A<A>): Promise<void>; // mappings is empty
export async function applyMappingsAsync<A,B>(variable: A, mappings: _AB<A,B>): Promise<IncludeErr<B, [B]>>; // mappings.length==1
export async function applyMappingsAsync<A,B,C>(variable: A, mappings: _ABC<A,B,C>): Promise<IncludeErr<C,[B,C]>>;
export async function applyMappingsAsync<A,B,C,D>(variable: A, mappings: _ABCD<A,B,C,D>): Promise<IncludeErr<D,[B,C,D]>>; // mappings.length==3
export async function applyMappingsAsync<A,B,C,D,E>(variable: A, mappings: _ABCDE<A,B,C,D,E>): Promise<IncludeErr<E,[B,C,D,E]>>;
export async function applyMappingsAsync<A,B,C,D,E,F>(variable: A, mappings: _ABCDEF<A,B,C,D,E,F>): Promise<IncludeErr<F,[B,C,D,E,F]>>; // mappings.length==5
export async function applyMappingsAsync<A,B,C,D,E,F,G>(variable: A, mappings: _ABCDEFG<A,B,C,D,E,F,G>): Promise<IncludeErr<G,[B,C,D,E,F,G]>>;
export async function applyMappingsAsync(variable: any, mappings: any): Promise<any> {
	if (variable instanceof Err) {
		return variable;
	}
	try {
		let result: any = variable;
		for (let i=0; i<mappings.length; i++) {
			result = await mappings[i](result);
			if (result instanceof Err) {
				throw result;
			}
		}
		return result;
	} catch (e: any) {
		if (e instanceof Err) {
			return e;
		}
		return new Err();
	}
}
