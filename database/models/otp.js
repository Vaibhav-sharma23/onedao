"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    const Otp = sequelize.define("Otp", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
      },
    }, {
      tableName: "otps",
      timestamps: true,
    });
  
    return Otp;
  };
  