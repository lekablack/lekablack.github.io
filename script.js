document.getElementById("year").textContent = new Date().getFullYear();

/*
  EVENTOS DO TIKTOK PIXEL
  Depois que você instalar seu Pixel, o código abaixo envia eventos
  quando alguém clica em um livro/CTA.

  O TikTok recomenda usar os eventos oficiais disponíveis na sua conta.
  Se o código do Pixel ainda não estiver instalado, nada acontece.
*/
document.querySelectorAll(".amazon-link").forEach(link => {
  link.addEventListener("click", () => {
    const book = link.dataset.book || "livro";
    if (typeof ttq !== "undefined") {
      ttq.track("ClickButton", {
        content_name: book,
        content_type: "product"
      });
    }
  });
});
