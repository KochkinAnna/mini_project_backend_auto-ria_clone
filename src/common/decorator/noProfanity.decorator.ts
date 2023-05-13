import { registerDecorator, ValidationOptions } from 'class-validator';

export const NoProfanity = (validationOption?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: 'noProfanity',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'The use of profanity is not allowed',
        ...validationOption,
      },
      validator: {
        validate(value: any) {
          // regex for profanity
          const regex =
            /\b(asshole|fuck(ing?)?|shit(ting?)?|bitch(es)?|damn|hell|piss(ing?)?|cunt|cock|dick|pussy|блять|блядь|хуй|пизда|їбати|єбать)\b/i;
          return typeof value === 'string' && !regex.test(value);
        },
      },
    });
  };
};
