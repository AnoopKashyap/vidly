import http from './httpService';
import { movieUrl } from '../config';

export function getGenres(){
	return http.get(movieUrl + '/genres');
}
