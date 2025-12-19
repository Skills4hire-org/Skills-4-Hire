from apps.authentication.services.baase_service import BaseService
from django.core.exceptions import ValidationError
from apps.authentication.otp_models import OTP_Base
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from djagno.core.cache import cache

class PasswordConfirmService(BaseService):


    def _decode_serializer(self):
        if not self._validate_serializer():

            raise ValidationError()

        validated_data = self.serializer.validated_data
        password = validated_data.get("password")
        code = validated_data.get("code")

        if not (password and code):
            raise ValidationError("Both 'password' and 'confirm' password' is required")

        return code


    def validate_code(self, code):
        """ A method that take otp code and check is still valid

            return:
                User object
        """

        if not code:
            raise ValidationError("code is required for password reset")

        try:
            code_instance  = get_object_or_404(OTP_Base, code=code)
            
            if code_instance.is_expired or code_instance.is_used:
                raise ValidationError("code is compromised. \n Invalid code provided")

            return code_instance.user

        except Exception as exc:
            raise ValidationError(f"Error {exc}")



    def pasword_reset_token_check(self, user, token):
        if not (user, token):
            raise  ValidationError("Both fields is requireed 'user', 'token'")

        try:
            token_generator = PasswordResetTokenGenerator()

            check_token = token_generator.check_token(user, token)
            if not check_token:
                raise ValidationError("Password reset token mismatch. Error")
            
            
        except Exception as exc:
            raise ValidationError(f"Error: {exc}")



        