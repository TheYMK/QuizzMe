import { required, helpers, email, sameAs } from "@vuelidate/validators";

const userLogin = {
  email: {
    required: helpers.withMessage(`L'identifiant est requis`, required),
    email: helpers.withMessage(`Adresse email invalide`, email),
    $autoDirty: true,
  },
  password: {
    required: helpers.withMessage("Le mot de passe est requis", required),
    $autoDirty: true,
  },
};

const userRegister = (userPassword) => {
  return {
    email: {
      required: helpers.withMessage(`L'identifiant est requis`, required),
      email: helpers.withMessage(`Adresse email invalide`, email),
      $autoDirty: true,
    },
    username: {
      required: helpers.withMessage(
        "Un nom d'utilisateur est requis",
        required
      ),
      $autoDirty: true,
    },
    password: {
      required: helpers.withMessage("Le mot de passe est requis", required),
      $autoDirty: true,
    },
    confirmPassword: {
      required: helpers.withMessage(
        "La confirmation du mot de passe est requise",
        required
      ),
      sameAsPassword: helpers.withMessage(
        "Les deux mots de passe ne correspondent pas",
        sameAs(userPassword)
      ),
      $autoDirty: true,
    },
  };
};

export { userLogin, userRegister };
