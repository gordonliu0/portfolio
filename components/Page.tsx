import type { ReactNode } from "react";

export function Page({
	gutter,
	children,
}: {
	gutter?: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="lg:ml-auto lg:grid lg:grid-cols-[14rem_minmax(0,680px)] lg:gap-16">
			<aside className="mb-10 lg:sticky lg:top-20 lg:mb-0 lg:h-fit">
				{gutter}
			</aside>
			<div>{children}</div>
		</div>
	);
}
