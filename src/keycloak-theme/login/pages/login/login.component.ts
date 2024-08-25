import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KcClassPipe } from '../../common/pipes/classname.pipe';
import { SanitizeHtmlPipe } from '../../common/pipes/sanitize-html.pipe';
import { PasswordWrapperComponent } from '../../common/components/password-wrapper/password-wrapper.component';
import { I18nService } from '../../common/services/i18n.service';

@Component({
  selector: 'kc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [KcClassPipe, CommonModule, SanitizeHtmlPipe, PasswordWrapperComponent],
})
export class LoginComponent {
  kcContext: any = window.kcContext;

  @ViewChild('headerNode') headerNode?: TemplateRef<any>;
  @ViewChild('infoNode') infoNode?: TemplateRef<any>;
  @ViewChild('socialProvidersNode') socialProvidersNode?: TemplateRef<any>;

  constructor(public i18nService: I18nService) {}

  onLoginSubmit(): void {
    this.kcContext.setIsButtonDisabled(true);
  }

  getUsernameLabel(i18n: any): string {
    const realm = this.kcContext?.realm;
    if (!realm.loginWithEmailAllowed) {
      return i18n.msgStr('username');
    } else if (!realm.registrationEmailAsUsername) {
      return i18n.msgStr('usernameOrEmail');
    } else {
      return i18n.msgStr('email');
    }
  }

  hasFieldError(...fields: string[]): boolean {
    return this.kcContext?.messagesPerField.existsError(...fields);
  }

  getFieldError(...fields: string[]): string {
    return this.kcContext?.messagesPerField.getFirstError(...fields);
  }

  trackByProvider(index: number, provider: any): any {
    return provider.alias;
  }

  getSocialAccountSectionClass(): string {
    return 'kcFormSocialAccountSectionClass';
  }

  getSocialAccountListClass(): string {
    return this.kcContext?.social?.providers?.length > 3
      ? 'kcFormSocialAccountListClass kcFormSocialAccountListGridClass'
      : 'kcFormSocialAccountListClass';
  }

  getProviderButtonClass(provider: any): string {
    return this.kcContext?.social?.providers?.length > 3
      ? 'kcFormSocialAccountListButtonClass kcFormSocialAccountGridItem'
      : 'kcFormSocialAccountListButtonClass';
  }

  getProviderIconClass(provider: any): string {
    return `kcFormSocialAccountNameClass ${provider.iconClasses}`;
  }

  getProviderTextClass(provider: any): string {
    return provider.iconClasses ? 'kcCommonLogoIdP kc-social-icon-text' : 'kcCommonLogoIdP';
  }

  getFormGroupClass(): string {
    return 'kcFormGroupClass';
  }

  getLabelClass(): string {
    return 'kcLabelClass';
  }

  getInputClass(): string {
    return 'kcInputClass';
  }

  getInputErrorClass(): string {
    return 'kcInputErrorMessageClass';
  }

  getFormGroupSettingClass(): string {
    return 'kcFormGroupClass kcFormSettingClass';
  }

  getFormOptionsWrapperClass(): string {
    return 'kcFormOptionsWrapperClass';
  }

  getButtonClass(): string {
    return 'kcButtonClass kcButtonPrimaryClass kcButtonBlockClass kcButtonLargeClass';
  }
}
