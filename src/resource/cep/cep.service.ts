import { Injectable } from '@nestjs/common';
import * as http from 'http';

@Injectable()
export class CepService {
    async getCidadeByCep(cep: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            http.get(`http://viacep.com.br/ws/${cep}/json/`, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    const cidade = JSON.parse(data).localidade;
                    resolve(cidade);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
