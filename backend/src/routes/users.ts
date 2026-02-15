import { Router, Request, Response } from 'express';
import { UserRepository } from '../database/UserRepository';
import { User } from '@shared/models';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// Get active users only
router.get('/active', async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.getActiveUsers();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch active users'
    });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    const user = await UserRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// Create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName, phone, address, city, country, postalCode, role, isActive } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email, username, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    const newUser = await UserRepository.createUser({
      email,
      username,
      password,
      firstName: firstName || null,
      lastName: lastName || null,
      phone: phone || null,
      address: address || null,
      city: city || null,
      country: country || null,
      postalCode: postalCode || null,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }

    const user = await UserRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const updateData = req.body;
    const updatedUser = await UserRepository.updateUser(id, updateData);

    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }

    const user = await UserRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const deleted = await UserRepository.deleteUser(id);
    if (deleted) {
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

export default router;
