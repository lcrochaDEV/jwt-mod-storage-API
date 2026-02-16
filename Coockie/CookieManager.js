class CookieManager {

    static set(nome, valor, dias = 7) {
        const data = new Date();
        // Converte dias para milissegundos
        data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
        
        const expires = `expires=${data.toUTCString()}`;
        // Atributos de segurança recomendados pela MDN
        const seguranca = "path=/; SameSite=Lax";
        
        document.cookie = `${nome}=${valor}; ${expires}; ${seguranca}`;
    }
    static get(nome) {
        const nomeChave = `${nome}=`;
        // Transforma a string de cookies em um array e busca o item correspondente
        const cookieEncontrado = document.cookie
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(nomeChave));

        return cookieEncontrado ? cookieEncontrado.substring(nomeChave.length) : null;
    }
    static delete(nome) {
        document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}


// --- Exemplo de Uso ---
// 1. Criar um cookie que dura 30 dias
CookieManager.set("session_token", "abc123xyz", 30);

// 2. Ler o cookie
console.log("Token:", CookieManager.get("session_token"));

// 3. Deletar o cookie
// CookieManager.delete("session_token");