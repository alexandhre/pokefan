import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

export interface Params {
	[ key: string ]: any;
}
 
export interface GetOptions {
	url: string;
	params?: Params;
}
 
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}
 

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    private loading: any;  
    private axiosClient: AxiosInstance;
	private errorHandler: ErrorHandler;  

    // I initialize the ApiClient.
	constructor( errorHandler: ErrorHandler ) {
 
		this.errorHandler = errorHandler;
 
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				"X-Initialized-At": Date.now().toString()
			}
		});
 
    }
    
    // I perform a GET request with the given options.
	public async buscarPokemon<T>( options: GetOptions  ) : Promise<T> {
 
		try {
 
			var axiosResponse = await this.axiosClient.request<any>({
				method: "get",
				url: options.url
			});
 
			return( axiosResponse.data );
 
		} catch ( error ) {
 
			return( Promise.reject( this.normalizeError( error ) ) );
 
		}
 
    }
    private normalizeError( error: any ) : ErrorResponse {
 
		this.errorHandler.handleError( error );
 
		// NOTE: Since I'm not really dealing with a production API, this doesn't really
		// normalize anything (ie, this is not the focus of this demo).
		return({
			id: "-1",
			code: "UnknownError",
			message: "An unexpected error occurred."
		});
 
	}      

    // listarPokemons(): Observable<any> {                                
    //     return this.http.get();
    // }

    // carregarMais(link): Observable<any> {                                
    //     return this.http.get(link);
    // }
    
}
