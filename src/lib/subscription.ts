import { prisma } from './prisma';

export async function checkFeatureEnabled(
  tenantId: string,
  feature: string
): Promise<boolean> {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { tenantId },
      include: { plan: true },
    });

    if (!subscription?.plan?.features) {
      return false;
    }

    const features = subscription.plan.features as Record<string, boolean>;
    return features[feature] ?? false;
  } catch (error) {
    console.error('Error checking feature enabled:', error);
    return false;
  }
}
