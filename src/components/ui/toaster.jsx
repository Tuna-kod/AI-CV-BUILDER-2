
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function Toaster() {
	const { toasts } = useToast();
  const { t } = useTranslation(['translation', 'common']);

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...props }) => {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && <ToastTitle>{typeof title === 'function' ? title(t) : t(title)}</ToastTitle>}
							{description && (
								<ToastDescription>{typeof description === 'function' ? description(t) : t(description)}</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose aria-label={t('common:close')} />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
