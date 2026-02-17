import jwt from 'jsonwebtoken';
import 'dotenv/config';

class JWT {
    // Buscamos a chave secreta diretamente do processo (arquivo .env)
    static SECRET_KEY = process.env.JWT_SECRET || 'fallback_key_nao_usar_em_producao';

    static gerarToken(objetoData) {
        // Criamos uma cópia para não deletar a expiração do objeto original
        const payload = { ...objetoData };

        // O JWT não aceita "expiresIn" dentro do payload se ele for passado no 3º argumento
        const tempoExpiracao = payload.expiracao || '1h';
        //delete payload.expiracao;

        return jwt.sign(payload, this.SECRET_KEY, {
            expiresIn: tempoExpiracao
        });
    }

    static validarToken(token) {
        try {
            // Retorna o objeto decodificado se o token for válido
            const hashToken = jwt.verify(token, this.SECRET_KEY);
            if (hashToken) {
                const { iat, exp, ...dadosLimpos } = hashToken;
                return dadosLimpos;
            }

        } catch (error) {
            // Retorna null caso o token seja inválido, manipulado ou expirado
            console.error("Token inválido ou expirado");
            return null;
        }
    }
}
export default JWT;