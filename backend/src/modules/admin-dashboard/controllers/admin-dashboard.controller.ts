import { NextFunction, Request, Response } from 'express';

import { AdminDashboardService } from '../services/admin-dashboard.service';

export class AdminDashboardController {
  private readonly adminDashboardService = new AdminDashboardService();

  /**
   * Get Admin Dashboard Summary
   */
  public getSummary = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dashboardSummary = await this.adminDashboardService.getSummary(
        req.user!.userId,
      );

      res.status(200).json({
        success: true,
        message: 'Admin dashboard summary fetched successfully.',
        data: dashboardSummary,
      });
    } catch (error) {
      next(error);
    }
  };
}