"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFeatureEnabled = checkFeatureEnabled;
const prisma_1 = require("./prisma");
async function checkFeatureEnabled(tenantId, feature) {
    try {
        const subscription = await prisma_1.prisma.subscription.findFirst({
            where: { tenantId },
            include: { plan: true },
        });
        if (!subscription?.plan?.features) {
            return false;
        }
        const features = subscription.plan.features;
        return features[feature] ?? false;
    }
    catch (error) {
        console.error('Error checking feature enabled:', error);
        return false;
    }
}
