import MemcachedClient from 'memcached';

// Formato correto da lista de servidores
const MEMCACHED_SERVERS_LIST = [`${SERVER_HOST}:${SERVER_PORT}`];

class Memcached {
    static client = null;

    /**
     * @param {string[]} servers - Lista de servidores. Default usa a constante acima.
     */
    static configurarConexao(servers = MEMCACHED_SERVERS_LIST) {
        console.info("Configurando conexão com Memcached...");

        try {
            this.client = new MemcachedClient(servers, {
                retries: 2,
                retry: 1000,
                remove: true 
            });

            this.client.set('_test_key_', '1', 10, (err) => {
                if (err) {
                    console.error("Não foi possível gravar no Memcached:", err.message);
                    this.client = null;
                } else {
                    console.info("Conexão com Memcached estabelecida com sucesso.");
                }
            });

        } catch (error) {
            console.error(`Erro ao iniciar o cliente Memcached: ${error}`);
            this.client = null;
        }
    }

    // Suas funções de lógica de negócio (gravar e recuperar)
    static async gravarNoMemcached({ chave, valor, expiracao } = itens) {

        if (!this.client) throw { status: 503, detail: "Serviço de Cache indisponível." };
    
        try {
            const valorSerializado = JSON.stringify(valor);
            await this.set(chave, valorSerializado, expiracao);
            return { status: "sucesso", chave_gravada: chave, tempo_expiracao_segundos: expiracao };
        } catch (error) {
            console.error(`Erro na operação de cache: ${error.message}`);
            throw { status: 500, detail: "Erro interno ao processar cache." };
        }
    }

    static async recuperarDoMemcached(chave) {
        if (!this.client) throw { status: 503, detail: "Serviço de Cache indisponível." };

        try {
            const valorSerializado = await this.get(chave);
            if (valorSerializado !== undefined && valorSerializado !== false && valorSerializado !== null) {
                try {
                    const valorObjeto = JSON.parse(valorSerializado);
                    return { 
                        status: "sucesso", 
                        chave, origem: "memcached", 
                        valor: valorObjeto 
                    };
                } catch (parseError) {
                    console.error(`Erro de desserialização para a chave: ${chave}`);
                    throw { status: 500, detail: "Dado corrompido no cache." };
                }
            } else {
                throw { status: 404, detail: `Chave '${chave}' não encontrada no cache.` };
            }
        } catch (error) {
            if (error.status) throw error;
            console.error(`Erro na comunicação com Memcached: ${error.message}`);
            throw { status: 500, detail: "Erro interno ao acessar o cache." };
        }
    }
    // Métodos estáticos auxiliares (Wrappers para Promises)
    static async get(chave) {
        if (!this.client) throw new Error("Cliente não inicializado.");
                
        return new Promise((resolve, reject) => {
            this.client.get(chave, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    static async set(chave, valor, expiracao) {
        if (!this.client) throw new Error("Cliente não inicializado.");

        return new Promise((resolve, reject) => {
            this.client.set(chave, valor, expiracao, (err) => {
                if (err) return reject(err);
                resolve(true);
            });
        });
    }
}

module.exports = Memcached;
