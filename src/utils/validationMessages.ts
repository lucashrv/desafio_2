export const validation = {
    required: (field: string) => `Campo "${field}" é requerido!`,
    maxlength: (field: string, length: number) =>
        `"${field}" teve ter tamanho até ${length}`,
};
