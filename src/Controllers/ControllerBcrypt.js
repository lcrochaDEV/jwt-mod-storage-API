import bcrypt from 'bcryptjs'; 

class Hash {
    // Definimos o custo do salt como uma constante da classe
    static SALT_ROUNDS = 10;

    static async setHash(senha) {
        try {
            // Usamos a constante estática da classe
            const hashGerado = await bcrypt.hash(senha, this.SALT_ROUNDS);
            //console.log("Hash gerado bcryptjs:", hashGerado);
            return hashGerado;
        } catch (error) {
           throw new Error({ message:"Erro ao criptografar:", error });
        }
    }
    static async compare(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }   
}

export default Hash;


//data = {chave, "valor": {user, passw}, expiracao})